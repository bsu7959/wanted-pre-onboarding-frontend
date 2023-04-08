import React from 'react'

export default function Todo() {
    window.history.pushState(null, null, 'todo')
    return (
        <div>Todo</div>
    )
}
