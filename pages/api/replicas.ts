export default async function handler(req: any, res: any) {
  const response = await fetch("https://tavusapi.com/v2/replicas", {
    method: "GET",
    headers: {
      "x-api-key": "0ea1afb1660e4b8baa6810d26f7b3146",
    },
  });

  const data = await response.json();
  res.status(200).json(data);
}
