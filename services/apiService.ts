const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export interface MvpRequestData {
  name: string;
  email: string;
  phone?: string;
  projectType: string;
  projectDescription: string;
  targetAudience?: string;
  uniqueSellingPoints?: string;
  features?: string[];
  budget: string;
  timeline?: string;
  communicationMethod: 'meeting' | 'description';
}

export interface MeetingData {
  title: string;
  description?: string;
  organizer: {
    name: string;
    email: string;
  };
  client: {
    name: string;
    email: string;
    phone?: string;
  };
  startTime: string;
  endTime: string;
  duration?: number;
  mvpRequestId?: string;
  agenda?: string[];
}

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout
    
    try {
      const response = await fetch(url, {
        ...config,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('API request failed:', error);
      throw error;
    }
  }

  // MVP Request methods
  async submitMvpRequest(data: MvpRequestData) {
    return this.request<{
      message: string;
      requestId: string;
      status: string;
    }>('/mvp/request', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMvpRequests(params?: {
    status?: string;
    projectType?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/mvp/requests${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      requests: any[];
      totalPages: number;
      currentPage: number;
      total: number;
    }>(endpoint);
  }

  async getMvpRequest(id: string) {
    return this.request<any>(`/mvp/request/${id}`);
  }

  async updateMvpRequestStatus(
    id: string,
    data: { status: string; assignedTo?: string; notes?: string; addedBy?: string }
  ) {
    return this.request<{
      message: string;
      request: any;
    }>(`/mvp/request/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async getMvpStats() {
    return this.request<{
      statusStats: Array<{ _id: string; count: number }>;
      projectTypeStats: Array<{ _id: string; count: number }>;
      budgetStats: Array<{ _id: string; count: number }>;
    }>('/mvp/stats');
  }

  // Meeting methods
  async scheduleMeeting(data: MeetingData) {
    return this.request<{
      message: string;
      meetingId: string;
      googleMeetLink: string;
    }>('/meetings/schedule', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getMeetings(params?: {
    status?: string;
    startDate?: string;
    endDate?: string;
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/meetings${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{
      meetings: any[];
      totalPages: number;
      currentPage: number;
      total: number;
    }>(endpoint);
  }

  async getMeeting(id: string) {
    return this.request<any>(`/meetings/${id}`);
  }

  async updateMeeting(
    id: string,
    data: { status?: string; notes?: string; actionItems?: any[] }
  ) {
    return this.request<{
      message: string;
      meeting: any;
    }>(`/meetings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async cancelMeeting(id: string, reason?: string) {
    return this.request<{
      message: string;
      meeting: any;
    }>(`/meetings/${id}/cancel`, {
      method: 'PATCH',
      body: JSON.stringify({ reason }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request<{
      status: string;
      message: string;
    }>('/health');
  }
}

export const apiService = new ApiService();