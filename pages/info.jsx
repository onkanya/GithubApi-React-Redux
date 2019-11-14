import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
// redux
import { useDispatch, useSelector } from 'react-redux'

// service
import service from '../services/index'

// style
import { Row, Col, Card, List } from 'antd'
const { Meta } = Card

const Info = () => {
    const route = useRouter()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.info)
    const userRepos = useSelector(state => state.repos)
    const { asPath } = route
    let loginName = asPath.replace('/info/', '')

    const fetchInfo = async () => {
        let newUserInfo = await service.users.fetchUserInfo(loginName)
        dispatch({
            type: 'SET_USER_INFO',
            info: newUserInfo
        })
    }

    const fetchRepos = async () => {
        let newUserRepos = await service.users.fetchUserRepos(loginName)
        dispatch({
            type: 'SET_USER_REPOS',
            repos: newUserRepos
        })
    }

    useEffect(async () => {
        dispatch({ type: 'SET_LOADER', status: true })
        await fetchInfo()
        await fetchRepos()
        dispatch({ type: 'SET_LOADER', status: false })
    }, [])

    return (
        <>
        <Row>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 4, offset: 2 }}>
                <Card
                    hoverable
                    cover={<img src={userInfo.avatar_url} width='100px' />}
                >
                    <Meta title={`${userInfo.login}`} description={`Repositories:  ${userInfo.public_repos}`} />

                </Card>
            </Col>
            <Col xs={{ span: 22, offset: 1 }} lg={{ span: 14, offset: 2 }}>
                <List
                    header={<div>Repositories</div>}
                    dataSource={userRepos}
                    renderItem={repos => (
                        <List.Item>
                            <List.Item.Meta
                            title={repos.name}
                            description={repos.description}
                            />
                        </List.Item>
                    )}
                />
            </Col>
        </Row>
        </>
    )
}

export default Info