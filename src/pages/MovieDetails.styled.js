import styled from '@emotion/styled'
import { Link } from 'react-router-dom'

const GoBack = styled(Link)`
text-decoration: none;
  color: rgb(99, 18, 18);
font-size: large;
font-weight: 700;
&:hover {
    color: rgb(140, 81, 81);;
}
`

const Wrapper = styled.div`
padding: 10px 0px 10px 0px;
border-bottom: 1px solid black;
`

const LinkMovie = styled(Link)`
text-decoration: none;
  color: rgb(99, 18, 18);
&:hover {
    color: rgb(140, 81, 81);;
}
`
const WrapperUl = styled.ul`
list-style: none;
padding: 10px 0px 10px 0px;
border-bottom: 1px solid black;
`
export {GoBack, Wrapper, LinkMovie, WrapperUl}