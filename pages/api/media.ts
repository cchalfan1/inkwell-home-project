import type { NextApiRequest, NextApiResponse } from 'next'
import {Data} from "../../store/types/api";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const query = `
        query ($limit: Int) {
          Page (perPage: $limit) {
            media {
              title {
                romaji
                english
                native
              }
              description
              coverImage {
                medium
              }
            }
          }
        }
        `;

    const variables = {
        limit: 10
    };

    const url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: query,
                variables: variables
            })
        };

    try {
        const response : Response = await fetch(url, options),
              json = await response.json()

        if (response.ok) {
            res.status(200).json(json.data)
        }
        else {
            const { errors } = json
            res.status(500).json({ statusCode:500, errors })
        }
    }
    catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
}
