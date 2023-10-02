import WEBSHOT from "@/services/webshot";

const handler = async (req: Request) => {
  const u = new URL(req.url ?? "");

  const r = await WEBSHOT<ArrayBuffer>({
    method: "get",
    url: `/webshot`,
    headers: {
      ...(req?.headers?.get("Authorization") && {
        Authorization: req?.headers?.get("Authorization"),
      }),
      "Content-Type": "application/json",
      Cookie: req?.headers?.get("Cookie"),
    },
    responseType: "arraybuffer",
    params: {
      url: u.searchParams.get("url"),
      filename: u.searchParams.get("filename"),
    },
  });

  return new Response(r, {
    headers: {
      "Content-Type": "application/pdf",
      "content-disposition": `attachment; filename="${u.searchParams.get("filename")}"`,
    },
  });
};

export { handler as GET };
