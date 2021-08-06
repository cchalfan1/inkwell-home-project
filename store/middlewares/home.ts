import {FETCH_IMAGES, onSetImages} from '../actions/home';
import {Action, Image} from "../types";

export interface Page {
    media: Array<Image>
}

const homeMidwr = () => {
    return (store: { dispatch: (arg0: any) => void; }) =>
        (next: (arg0: Action) => void) => async (action : Action) => {

        if (action.type === FETCH_IMAGES) {

            // searched for way to map/resolve result to different data structure, but would take more time
            // there may be a better way to abstract these graphql queries
            var query = `
                query ($id: Int, $page: Int, $perPage: Int, $search: String) {
                  Page (page: $page, perPage: $perPage) {
                    pageInfo {
                      total
                      currentPage
                      lastPage
                      hasNextPage
                      perPage
                    }
                    media (id: $id, search: $search) {
                      id
                      title {
                        romaji
                        english
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
                page: action.data,
                perPage: 10
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

            const mapData = (data : { Page: Page }) => {
                if (!data || !data.Page || !data.Page.media) {
                    console.error("No Page Data")
                    alert("Response did not return page data correctly")
                }
                return data.Page.media.map(d => ({
                    id: d.id,
                    title: d.title.english,
                    description: d.description,
                    imageUrl: d.coverImage?.medium
                }))
            }

            try {
                const response : Response = await fetch(url, options),
                    json = await response.json()

                if (response.ok) {
                    // @ts-ignore
                    store.dispatch(onSetImages(mapData(json.data), action.data as number))
                }
                else {
                    console.log(json.errors)
                    alert(`There has been an error displaying images. Please send this message to our team: ${json.errors}`)
                }
            }
            catch (error) {
                console.error(error)
                alert(`There has been an error displaying images. Please send this message to our team: ${error.message}`)
            }
        }
        else {
            return next(action)
        }
    }
}

export default homeMidwr();
