import React from 'react'
import styled from 'styled-components'

import { useSelector } from 'react-redux'

const LoaderContainer = styled.div`
    position: absolute;
`

const LoaderBg = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255,255,255, 0.6);
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Loader = styled.div`
    display: inline-block;
    width: 64px;
    height: 64px;

    &:after {
        content: " ";
        display: block;
        width: 46px;
        height: 46px;
        margin: 1px;
        border-radius: 50%;
        border: 5px solid #1abc9c;
        border-color: #1abc9c transparent #1abc9c transparent;
        animation: lds-dual-ring 1.2s linear infinite;
    }

    @keyframes lds-dual-ring {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`

const Header = styled.div`
    padding: 60px;
    text-align: center;
    background: #1abc9c;
    color: white;
    font-size: 30px;
`

const Content = styled.div`
    padding: 20px 20px;
`

const Footer = styled.footer`
    padding: 20px 20px;
    text-align: center;
`

const layout = (props) => {
    const isLoad = useSelector(state => state.isLoding)
    return (
        <>
            {
                isLoad ? <LoaderContainer>
                    <LoaderBg>
                        <Loader />
                    </LoaderBg>
                </LoaderContainer> : <div></div>
            }
            <Header>
                Github API from React, Redux
            </Header>
            <Content>
                {props.children}
            </Content>
            <hr />
            <Footer>
                Create by React, Redux, Ant design
            </Footer>
        </>
    )
}

export default layout