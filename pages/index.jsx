import React, { useEffect, useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'

// service
import service from '../services/index'

// Link
import Link from 'next/link'

// style
import { Row, Col, List, Avatar, Input, Button } from 'antd'

const Users = () => {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    
    // search
    let [searchText, setSearch] = useState('')
    let [totalCount, setCount] = useState(0)

    // loadmore
    let [currentItems, setCurrentItems] = useState(0)

    const fetchUser = async () => {
        dispatch({
            type: 'SET_LOADER',
            status: true
        })
        
        // search params
        const params = {
            q: searchText,
            since: currentItems
        }
        let ShowNewUser = []
        if (searchText !== '') {
            ShowNewUser = await service.users.searchUser(params)
            setCount(ShowNewUser.total_count)
            ShowNewUser = ShowNewUser.items
        } else {
            ShowNewUser = await service.users.fetchUser(params)
            setCount(0)
        }
        
        // check length are match for load more
        if (currentItems != 0) {
            ShowNewUser = [
                ...users,
                ...ShowNewUser
            ]
        }
        
        dispatch({
            type: 'SET_USERS',
            users: ShowNewUser
        })
        
        dispatch({
            type: 'SET_LOADER',
            status: false
        })
    }

    // search
    const onTextChange = (e) => {
        setSearch(e.target.value)
    }

    const onSearchClick = () => {
        if (currentItems === 0) {
            fetchUser()
        }
        setCurrentItems(0)
    }

    // load more
    const onSeeMoreClick = () => {
        setCurrentItems(currentItems += 30)
    }

    // show more items
    useEffect(() => {
        fetchUser()
    }, [currentItems])

    useEffect(() => {
        fetchUser()
    }, [])

    return(
        <>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 6, offset: 8 }} style={{ textAlign: 'center'}}>
                    <Input onChange={onTextChange} />
                </Col>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 1 }} style={{ textAlign: 'center'}}>
                    <Button onClick={onSearchClick}>search</Button>
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} lg={{ span: 12, offset: 6 }}>
                    <List
                    dataSource={users}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={ item.avatar_url }/>}
                                title={ item.login }
                                description={ item.url }
                            />
                            <Link href={`/info/${item.login}`}><a>info</a></Link>
                        </List.Item>
                        )}
                    />
                </Col>
            </Row>
            <Row>
                <Col xs={{ span: 2, offset: 10 }} lg={{ span: 2, offset: 12 }}>
<Button disabled={totalCount >= 1 && totalCount <= users.length} onClick={onSeeMoreClick}>See more</Button>
                </Col>
            </Row>
        </>
    )
}

export default Users