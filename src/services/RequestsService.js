import config from '../config'
import TokenService from '../services/TokenService'

const RequestsService = {
  sendJoinRequest(recipient_id, project_id) {
    return fetch(`${config.API_ENDPOINT}/sse/requests`, {
      method: 'POST',
      body: JSON.stringify({recipient_id, project_id}), 
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    })
      .then(res=> !res.ok ? res.json().then(e=> Promise.reject(e)) : res.json())
      .then(res=> console.log(res))
      .catch(err => console.error(err))
  },
  updateRequest(data) {
    return fetch(`${config.API_ENDPOINT}/sse/requests`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      }
    })
    .then(res=> !res.ok ? res.json().then(e=> Promise.reject(e)) : res.json())
    .catch(err=> console.log(err))
  },
  deleteRequest(req_id) {
    return fetch(`${config.API_ENDPOINT}/requests/${req_id}`, {
      method: 'DELETE',
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })
      .then(res=> !res.ok ? res.json().then(e=> Promise.reject(e)) : res.json())
  }
}

export default RequestsService