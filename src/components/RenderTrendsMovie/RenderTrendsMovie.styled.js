import styled from '@emotion/styled'
import { Link } from 'react-router-dom'
const Wrapper = styled.ul`
list-style: none;
`

const LinkMovie = styled(Link)`
text-decoration: none;
color: rgb(99, 18, 18);
&:hover {
    color: rgb(140, 81, 81);;
}
`


export {Wrapper, LinkMovie}