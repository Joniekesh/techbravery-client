import type {
  Application,
  ApplicationListResponse,
  ApplicationQuery,
  CreateApplicationPayload,
  UpdateApplicationPayload,
} from "@/types/application";
import { makeRequest } from "@/utils/makeRequest";

export const applicationsApi = {
  async getAll(
    params: ApplicationQuery = {},
  ): Promise<ApplicationListResponse> {
    const { data } = await makeRequest.get<ApplicationListResponse>(
      "/application",
      {
        params,
      },
    );

    // console.log("APPLICATIONS", data);

    return data;
  },

  async getAllAdmin(
    params: ApplicationQuery = {},
  ): Promise<ApplicationListResponse> {
    const { data } = await makeRequest.get<ApplicationListResponse>(
      `/application/admin`,
      {
        params,
      },
    );

    return data;
  },

  async getById(id: string): Promise<Application> {
    const { data } = await makeRequest.get<Application>(
      `/application/${id}/admin`,
    );

    return data;
  },

  async getBySlug(slug: string): Promise<Application> {
    const { data } = await makeRequest.get<Application>(
      `/slug/${encodeURIComponent(slug)}`,
    );

    return data;
  },

  async delete(id: string) {
    const { data } = await makeRequest.delete(`/application/${id}`);

    return data;
  },

  async restore(id: string) {
    const { data } = await makeRequest.patch(`/application/${id}/restore`);

    return data;
  },

  async updateStatus(id: string, status: string) {
    const { data } = await makeRequest.put(`/application/${id}/status`, {
      status,
    });

    return data;
  },

  async updatePublishing(id: string, isLive: boolean) {
    const { data } = await makeRequest.patch(`/application/${id}/publishing`, {
      isLive,
    });

    return data;
  },

  updateApplication: async (id: string, payload: UpdateApplicationPayload) => {
    const response = await makeRequest.put(`/application/${id}`, payload);

    return response.data;
  },

  async getStats() {
    const { data } = await makeRequest.get(`/application/stats`);

    return data;
  },

  async getAnalytics(id: string) {
    const { data } = await makeRequest.get(`/application/${id}/analytics`);

    return data;
  },

  async createApplication(payload: CreateApplicationPayload) {
    const { data } = await makeRequest.post<Application>(
      "/application",
      payload,
    );

    return data;
  },
};
