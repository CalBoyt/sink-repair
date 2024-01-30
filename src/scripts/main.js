import { SinkRepair } from "./SinkRepair.js"
import { fetchPlumbers, fetchRequests } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")

const render = () => {
    fetchRequests()
    .then(() => fetchPlumbers ())
    .then(
        () => {
            mainContainer.innerHTML = SinkRepair()
        }
    )
}

render()

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

