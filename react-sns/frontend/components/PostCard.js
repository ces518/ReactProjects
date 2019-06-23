import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Avatar, Button, Card, Comment, Form, Icon, Input, List } from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
    }, []);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
            }
        });
    }, [me && me.id]); // 객체 말고 기본자료형을 넣어줄것.

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.img && <img alt="example" src={post.img} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map(v => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link href="/hashtag" key={v}><a>{v}</a></Link>
                            )
                        }
                        return v;
                    })}</div>} // next 의 Link 태그로 바꾸어주어야함
                />
            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.user.nickname}
                                    avatar={<Avatar>{item.user.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
