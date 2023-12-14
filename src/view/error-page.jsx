import { useRouteError  } from 'react-router-dom'

export default function ErrorPage() {
  const error = useRouteError()
  console.log(error)

  return (
    <div id="error_page">
      <h1>Oops!</h1>
      <p>你进入了异常错误页面</p>
      <p>
        <i>{ error.statusText || error.message }</i>
      </p>
    </div>
  )
}