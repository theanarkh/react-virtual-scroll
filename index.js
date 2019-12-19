import ReactDOM from 'react-dom'
import React, { useState, useMemo } from 'react'

function getData(length = 10000) {
  const arr = []
  var i = 0
  while (i < length) {
    arr.push(String(i++))
  }
  return arr
}
const data = getData()
const itemHeight = 21
const itemLength = 10
// 是否开启虚拟滚动
const enableVirtualScroll = true

export default function App() {
  let [list, setList] = useState(data)
  const [offset, setOffset] = useState(0)
  const [scroll, setScroll] = useState(0)
  const options = useMemo(() => {
    return list.length ? list.slice(offset, offset + itemLength) : ['暂无数据']
  }, [offset, list])
  return (
    <>
      <input
        onChange={v => {
          const next = data.filter(value => {
            return value.includes(v.target.value)
          })
          setList(next)
        }}
      />
      <div
        onScroll={event => {
          if (!enableVirtualScroll) {
            return
          }
          var { scrollTop } = event.target
          setScroll(scrollTop)
          setOffset(~~(scrollTop / itemHeight))
        }}
        style={{
          height: `${options.length > itemLength ? itemHeight * itemLength : options.length * itemHeight}px`,
          overflowY: 'scroll',
          border: '1px solid black',
          marginTop: '10px'
        }}>
        <ul style={{ height: `${list.length * itemHeight}px`, position: 'relative', listStyleType: 'none', margin: '0px' }}>
          {(enableVirtualScroll ? options : list).map((v, index) => {
            return (
              <li style={enableVirtualScroll ? { position: 'absolute', top: `${index * itemHeight + scroll}px` } : {}} key={index}>
                {v}
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
