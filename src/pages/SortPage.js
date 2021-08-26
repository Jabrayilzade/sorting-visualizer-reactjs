import React from 'react'
import {Button, makeStyles} from '@material-ui/core'
import sass from '../sass/sort.module.sass'

const useStyles = makeStyles(() => ({
  btn: {
    position: 'relative',
    background: 'rgba(128, 128, 128, 0.47)',
    color: 'white',
    fontWeight: 600,
    fontSize: 15,
    textTransform: 'none',
    '&:hover': {
      background: '#232222'
    },
    '&:not(:last-child)': {
      marginRight: 10,
    }
  }
}))

export const SortPage = () => {
  const mui = useStyles()

  const arrRef = React.useRef()
  const [arr, setArr] = React.useState([])

  const handleArray = React.useCallback(() => {
    generateArray()
  }, [])

  React.useEffect(() => {
    handleArray()
  }, [handleArray])

  const swap = (idx1, idx2) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('-------')
        console.log(arrRef.current.childNodes[idx2].style.height)
        console.log(arrRef.current.childNodes[idx1].style.height)

        let height = arrRef.current.childNodes[idx2].style.height
        arrRef.current.childNodes[idx2].style.height = arrRef.current.childNodes[idx1].style.height
        arrRef.current.childNodes[idx1].style.height = height


        console.log(arrRef.current.childNodes[idx2].style.height)
        console.log(arrRef.current.childNodes[idx1].style.height)
        resolve()
      }, 0)
    })
  }

  async function bubbleSort(delay = 0) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        await new Promise((resolve) =>
          setTimeout(() => {
            resolve()
          }, delay)
        )
        if (arr[j] > arr[j + 1]) await swap(j, j + 1)
      }
    }
  }

  const generateArray = () => {
    setArr([])

    for (let i = 0; i < 10; i++) {
      setArr(state => [...state, Math.floor(Math.random() * (800 - 1)) + 1])
    }
  }

  return (
    <div className={sass.visualizer}>
      <div className={sass.visualizer__header}>
        <div className={sass.visualizer__title}>Sorting Visualizer</div>
        <div className={sass.visualizer__controls}>
          <Button className={mui.btn} onClick={generateArray}>Regenerate</Button>
          <Button className={mui.btn} onClick={bubbleSort}>Sort</Button>
        </div>
      </div>
      <div className={sass.visualizer__body}>
        <ul className={`${sass.visualizer__arr} ${sass.arr}`} ref={arrRef}>
          {arr?.map((val, index) => (
            <li
              className={sass.arr__item}
              key={index}
              style={{height: val}}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}