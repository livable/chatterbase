import React from 'react'
import MessageView from './messageView.jsx'
import MessageComposer from './messageComposer.jsx'

const ThreadTeaser = (props) => {
    let {thread} = props
    let messageIds = Object.keys(thread.messages || {}).sort()
    let firstMessage = thread.messages && thread.messages[messageIds[0]]
    return <MessageView {...firstMessage} {...props}>
        {messageIds.length - 1} replies
    </MessageView>
}

class ThreadComposer extends React.Component {
    constructor(props){
        super(props)
        this.state = { draftText: "" }
    }

    render(){
        let {draftText=""} = this.state
        let {group, userId, onPostNewThread} = this.props
        return <form>
            <input placeholder="Type a message..." />
            <button>Submit</button>
            <button>Start script</button>
        </form>
    }
}

const ThreadViewer = (props) => {
    let {messages} = props
    return <div className="Column">
        <header className="bar bar-nav">
            <h1 className="title"> Thread </h1>
        </header>
        <div className="content">{
            Object.values(messages).map(m => <MessageView {...m} {...props} />)
        }</div>
        <MessageComposer {...props} />
    </div>
}

export default class GroupFeed extends React.Component {
    constructor(props){
        super(props)
        this.state = { selectedThread: null }
    }
    
    render(){
        let {members} = this.props.group
        let {selectedThread} = this.state
        if (selectedThread) return <ThreadViewer {...selectedThread} {...props} />
        return <div className="Column">
            <header className="bar bar-nav">
           		<h1 className="title">
                    {Object.values(members).map(m => <b>{m.displayName}</b>)}
            	</h1>
            </header>
            <div className="content">
                <ThreadComposer {...props} />
                {
                    Object.keys(props.group.threads).map(threadId => (
                        <ThreadTeaser
                            thread={props.group.threads[threadId]}
                            onClick={() => this.setState({selectedThread: props.group.threads[threadId]})}
                            {...props} 
                        />
                    ))
                }
            </div>
        </div>
    }
}