type Props = {
  complete: string
}

const complete = (props: Props): JSX.Element => {
  return <img src={props.complete} alt="" />
}

export default complete
