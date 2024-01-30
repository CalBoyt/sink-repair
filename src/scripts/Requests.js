import { getPlumbers, getRequests, sendCompletion, deleteRequest } from "./dataAccess.js";

const mainContainer = document.querySelector("#container")

const convertRequestToListElement = (custRequest) => {
    const plumbers = getPlumbers()
    let html = `<li>
        Description:${custRequest.description} 
    </li>
    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>

    ${
        plumbers.map(
            plumber => {
                return `<option value="${custRequest.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
    }
</select>
<li>
        ${custRequest.description}
        <button class="request__delete"
                id="request--${custRequest.id}">
            Delete
        </button>
    </li>
`
    
    return html
}


export const Requests = () => {
    const requests = getRequests()

    let html = `
    <ul>
      ${
        requests.map(convertRequestToListElement).join("")
    }
    </ul>
    `

    return html    
}

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                serviceRequestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_completed: Date.now()
             }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            sendCompletion( completion)

        }
    }
)


