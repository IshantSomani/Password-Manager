import { RouterProvider } from 'react-router-dom'
import Router from './router/Router'
import { Provider } from 'react-redux'
// import store from './redux/store/store'
import store from './redux/store/store'
// import './App.css'

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={Router} />
    </Provider>
  )
}

export default App
