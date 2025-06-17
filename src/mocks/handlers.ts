import { http } from "msw";
import { mockTableData } from "../fixtures/tableData";

export const handlers = [
  http.get("/api/items", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedData = mockTableData.slice(startIndex, endIndex);

    return new Response(
      JSON.stringify({
        data: paginatedData,
        total: mockTableData.length,
        page,
        limit,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }),
]; 