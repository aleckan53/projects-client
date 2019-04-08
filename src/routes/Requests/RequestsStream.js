import React, { useEffect, useState } from 'react'
import config from '../../config'
import TokenService from '../../services/TokenService'
import RequestCard from '../../components/RequestCard/RequestCard'
import { Header, HeaderBtn, Msg } from '../../components/Basic/Basic'
import { IoMdTrash as icon } from 'react-icons/io'
import EventSource from 'eventsource'

const RequestsStream = props => {

  const [state, setState] = useState({
    incoming: [],
    outgoing: [],
  })

  useEffect(()=> {
    // sse connection
    const src = new EventSource(`${config.API_ENDPOINT}/sse`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`,
      }
    })

    src.onmessage = ev => {
      const data = JSON.parse(ev.data)
      setState({
        incoming: [...state.incoming, ...data.incoming],
        outgoing: [...state.outgoing, ...data.outgoing],
      })
    }

    src.onerror = () => {
      src.close()
    }

    return () => {
      src.close()
    }
  }, [])


  return (
    <section className='Requests'>
      <Header h1='Requests'>
        <HeaderBtn icon={icon}/>
      </Header>
      { state.incoming.length === 0 ? '' : (
        <div>
          <h3>Incoming</h3>
          {state.incoming.map((r,i)=> 
            <RequestCard.Incoming {...r} key={i}/>
          )}
        </div>
      )}  
      { state.outgoing.length === 0 ? '' : (
        <div>
          <h3>Outgoing</h3>
          {state.outgoing.map((r,i)=> 
            <RequestCard.Outgoing {...r} key={i}/>
          )}
        </div>
      )}
      { !state.incoming.length && !state.outgoing.length ? <Msg text="New requests appear here"/> : ''
      }
    </section>
  )
}

export default RequestsStream