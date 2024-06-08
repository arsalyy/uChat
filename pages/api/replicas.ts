export default async function handler(req: any, res: any) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Use GET instead." });
  }

  try {
    const response = await fetch("https://tavusapi.com/v2/replicas", {
      method: "GET",
      headers: {
        "x-api-key": "0ea1afb1660e4b8baa6810d26f7b3146",
      },
    });

    if (!response.ok) {
      console.error("Failed to fetch replicas:", response.statusText);
      return res
        .status(response.status)
        .json({ error: "Failed to fetch replicas." });
    }

    const data = (await response.json()).data;

    if (
      !Array.isArray(data) ||
      !data.every((item) => item.replica_id && item.replica_name)
    ) {
      console.error("Invalid data structure received:", data);
      return res
        .status(500)
        .json({ error: "Invalid data structure received from API." });
    }

    res.status(200).json(data);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch from API" });
  }
}
