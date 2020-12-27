import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, Spinner } from 'native-base'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ChildComment } from './ChildComment'
import { fetchChildComments } from '../../actions/childCommentsActions'

const ChildCommentsList = (props) => {
    const { comment, user, loading, hasErrors, handleFetchChildComments, childComments } = props

    useEffect(() => {
        handleFetchChildComments(comment.id)
        // alert(comment.id)
        // alert("childComments: " + JSON.stringify(childComments))
    }, [])

    // const childComments = [
    //     {id: 1, title: "Child Comment", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'},
    //     // {id: 2, title: "Child Comment 2", subTitle: "@Child_Sub_Title", comment_text: "Decscription", cdate_date: '2020-11-27'}
    // ]
    const renderChildComments = () => {
        if (hasErrors) return <Text style={styles.error}>Unable to display comments.</Text>
        return childComments.map(childComment => <ChildComment key={childComment.id} childComment={childComment} user={user} />)
    }
    return (
        <View style={{ flex: 1, flexDirection: 'column', paddingLeft: 50, paddingTop: 10 }}>
            {/* {loading ? <Spinner color="#00639c" style={{ marginTop: 10, alignSelf: 'center', height: 25, width: 25 }} /> : null} */}
            {renderChildComments()}
        </View>
    )
}

// const mapStateToProps = (state) => ({
//     loading: state.comments.loading,
//     comments: state.comments.comments,
//     hasErrors: state.comments.hasErrors
// })
// export default connect(mapStateToProps)(ChildCommentsList)

function mapStateToProps(state) {
    return {
        childComments: state.childComments.childComments
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        // handleIncrease: increaseCount,
        // handleDecrease: decreaseCount,
        // handleReset: resetCount,
        handleFetchChildComments: fetchChildComments
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChildCommentsList)