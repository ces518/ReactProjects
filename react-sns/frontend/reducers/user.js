import produce from 'immer';

export const initialState = {
    isLoggingOut: false, // 로그아웃 시도중
    isLoggingIn: false, // 로그인 시도중
    isEdittingNickname: false, // 닉네임 변경 시도중
    loginErrorReason: '', // 로그인실패 이유
    signedUp: false, // 회원가입 성공 여부
    isSigningUp: false, // 회원가입 시도중
    signUpErrorReason: '', //회원가입실패사유
    editNicknameErrorReason: '', // 이름변경 실패사유
    me: null,
    followingList: [], // 팔로잉 목록
    followerList: [], // 팔로워목록
    userInfo: null, // 다른사람의 정보
    hasMoreFollower: false,
    hasMoreFollowing: false,
};

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'; // action의 이름
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

export const LOAD_FOLLOWINGS_REQUEST = 'LOAD_FOLLOWINGS_REQUEST';
export const LOAD_FOLLOWINGS_SUCCESS = 'LOAD_FOLLOWINGS_SUCCESS';
export const LOAD_FOLLOWINGS_FAILURE = 'LOAD_FOLLOWINGS_FAILURE';

export const LOAD_FOLLOWERS_REQUEST = 'LOAD_FOLLOWERS_REQUEST';
export const LOAD_FOLLOWERS_SUCCESS = 'LOAD_FOLLOWERS_SUCCESS';
export const LOAD_FOLLOWERS_FAILURE = 'LOAD_FOLLOWERS_FAILURE';

export const FOLLOW_USER_REQUEST = 'FOLLOW_USER_REQUEST';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const FOLLOW_USER_FAILURE = 'FOLLOW_USER_FAILURE';

export const UNFOLLOW_USER_REQUEST = 'UNFOLLOW_USER_REQUEST';
export const UNFOLLOW_USER_SUCCESS = 'UNFOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER_FAILURE = 'UNFOLLOW_USER_FAILURE';

export const REMOVE_FOLLOWER_REQUEST = 'REMOVE_FOLLOWER_REQUEST';
export const REMOVE_FOLLOWER_SUCCESS = 'REMOVE_FOLLOWER_SUCCESS';
export const REMOVE_FOLLOWER_FAILURE = 'REMOVE_FOLLOWER_FAILURE';

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_FAILURE = 'LOAD_USER_FAILURE';

export const LOAD_USER_INFO_REQUEST = 'LOAD_USER_INFO_REQUEST';
export const LOAD_USER_INFO_SUCCESS = 'LOAD_USER_INFO_SUCCESS';
export const LOAD_USER_INFO_FAILURE = 'LOAD_USER_INFO_FAILURE';

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'; // 중요한 액션, reducer의 단점때문에 어쩔수 없이 만든 액션
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME'; //

export const EDIT_NICKNAME_REQUEST = 'EDIT_NICKNAME_REQUEST';
export const EDIT_NICKNAME_SUCCESS = 'EDIT_NICKNAME_SUCCESS';
export const EDIT_NICKNAME_FAILURE = 'EDIT_NICKNAME_FAILURE';


const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST: {
                return {
                    ...state,
                    isLoggingIn: true,
                    loginErrorReason: '',
                }
            }
            case LOG_IN_SUCCESS: {
                return {
                    ...state,
                    isLoggedIn: true,
                    me: action.data,
                    isLoading: false,
                    isLoggingIn: false,
                }
            }
            case LOG_IN_FAILURE: {
                return {
                    ...state,
                    loginErrorReason: action.error,
                    me: null,
                    isLoggingIn: false,
                }
            }
            case LOG_OUT_REQUEST: {
                return {
                    ...state,
                    isLoggingOut: true,
                }
            }
            case LOG_OUT_SUCCESS: {
                return {
                    ...state,
                    me: null,
                    isLoggingOut: false,
                }
            }
            case LOG_OUT_FAILURE: {
                return {
                    ...state,
                    isLoggingOut: false,
                }
            }
            case SIGN_UP_REQUEST: {
                return {
                    ...state,
                    isSigningUp: true,
                    signUpErrorReason: '',
                }
            }
            case SIGN_UP_SUCCESS: {
                return {
                    ...state,
                    isSigningUp: false,
                    isSignedUp: true,
                }
            }
            case SIGN_UP_FAILURE: {
                return {
                    ...state,
                    isSigningUp: false,
                    signUpErrorReason: action.error // saga에서 넣어준 error가 여기로전달됨.
                }
            }
            case LOAD_USER_REQUEST: {
                return {
                    ...state,
                }
            }
            case LOAD_USER_SUCCESS: {
                return {
                    ...state,
                    me: action.data,
                }
            }
            case LOAD_USER_FAILURE: {
                return {
                    ...state,
                }
            }
            case LOAD_USER_INFO_REQUEST: {
                return {
                    ...state,
                }
            }
            case LOAD_USER_INFO_SUCCESS: {
                return {
                    ...state,
                    userInfo: action.data,
                }
            }
            case LOAD_USER_INFO_FAILURE: {
                return {
                    ...state,
                }
            }
            case FOLLOW_USER_REQUEST: {
                return {
                    ...state,
                }
            }
            case FOLLOW_USER_SUCCESS: {
                draft.me.Followings.unshift({ id: action.data });
                break;
            }
            case FOLLOW_USER_FAILURE: {
                return {
                    ...state,
                }
            }
            case UNFOLLOW_USER_REQUEST: {
                return {
                    ...state,
                }
            }
            case UNFOLLOW_USER_SUCCESS: {
                return {
                    ...state,
                    me: {
                        ...state.me,
                        Followings: state.me.Followings.filter(user => user.id !== action.data)
                    },
                    followingList: state.followingList.filter(user => user.id !== action.data),
                }
            }
            case UNFOLLOW_USER_FAILURE: {
                return {
                    ...state,
                }
            }
            case ADD_POST_TO_ME: {
                return {
                    ...state,
                    me: {
                        ...state.me,
                        Posts: [{ id: action.data }, ...state.me.Posts],
                    }
                }
            }
            case LOAD_FOLLOWERS_REQUEST: {
                return {
                    ...state,
                    hasMoreFollower: action.offset ? state.hasMoreFollower : true, // 처음 데이터를 가져올때는 더보기 버튼 출력
                    followerList: action.offset ? state.followerList : [],
                }
            }
            case LOAD_FOLLOWERS_SUCCESS: {
                return {
                    ...state,
                    followerList: state.followerList.concat(action.data),
                    hasMoreFollower: action.data.length === 3,
                }

            }
            case LOAD_FOLLOWERS_FAILURE: {
                return {
                    ...state,
                }
            }
            case LOAD_FOLLOWINGS_REQUEST: {
                return {
                    ...state,
                    hasMoreFollowing: action.offset ? state.hasMoreFollowing : true,
                    followingList: action.offset ? state.followingList : [],
                }
            }
            case LOAD_FOLLOWINGS_SUCCESS: {
                return {
                    ...state,
                    followingList: state.followingList.concat(action.data),
                    hasMoreFollowing: action.data.length === 3,
                }

            }
            case LOAD_FOLLOWINGS_FAILURE: {
                return {
                    ...state,
                }
            }
            case REMOVE_FOLLOWER_REQUEST: {
                return {
                    ...state,
                }
            }
            case REMOVE_FOLLOWER_SUCCESS: {
                return {
                    ...state,
                    me: {
                        ...state.me,
                        Followers: state.me.Followers.filter(v => v.id !== action.data),
                    },
                    followerList: state.followerList.filter(v => v.id !== action.data),
                }
            }
            case REMOVE_FOLLOWER_FAILURE: {
                return {
                    ...state,
                }
            }
            case EDIT_NICKNAME_REQUEST: {
                return {
                    ...state,
                    isEdittingNickname: true,
                }
            }
            case EDIT_NICKNAME_SUCCESS: {
                return {
                    ...state,
                    me: {
                        ...state.me,
                        nickname: action.data,
                    },
                    isEdittingNickname: false,
                }

            }
            case EDIT_NICKNAME_FAILURE: {
                return {
                    ...state,
                    isEdittingNickname: false,
                    editNicknameErrorReason: action.error,
                }
            }
            case REMOVE_POST_OF_ME: {
                return {
                    ...state,
                    me: {
                        ...state.me,
                        Posts: state.me.Posts.filter(post => post.id !== action.data),
                    }
                }
            }
            default: {
                return {
                    ...state,
                }
            }
        }
    });

};

export default reducer;
