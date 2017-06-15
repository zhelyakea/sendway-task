import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {style} from 'root/style'

import * as websocket from 'websocket'

export class Messages extends Component {
	constructor(){
		super()
    this.state = { comment: ''}
    this.inputComment = ::this.inputComment
    this.saveComment = ::this.saveComment
    this.pressEnter = ::this.pressEnter
  }
  inputComment(event){
    this.setState({
      comment: event.target.value
    })
  }
  saveComment(){
    const { sendMessage } = this.props.websocket
    if(this.state.comment.length > 0){
			sendMessage(this.state.comment)
	    this.setState({
	      comment: ''
	    })
		}
  }
	pressEnter(target) {
    if(target.charCode==13){
      this.saveComment()
    }
	}
	render() {
		const { openConnection, closeConnection } = this.props.websocket
		const { messages } = this.props

		const message_list = messages.status ? messages.messages.map((value, index) => {
			return <div className={`${style.list_container}`} key={index}>
			<div className={`${style.list_container} white margin_5 padding_3_10px font_2em margin_left_auto border_radius`}>
			{value}</div></div>
		}) : null
		const main_div = messages.status ?
		<div className={`h_w_100 ${style.col_container}`}>

			<button
        className={`${style.nav_button_red} margin_left_auto`}
				onClick={() => closeConnection()}
				>Выйти</button>

	      <div className={`${style.col_container} justify_center scroll_height padding_15px`}>
	  			<div className={`${style.col_container} scroll_height_inside list_order`}>{message_list}
	      </div>
      </div>

			<div className={`${style.list_container} gray`}>

				<input
					className={`${style.input_white} flex_1`}
					onChange={this.inputComment}
				 	onKeyPress={this.pressEnter}
					placeholder="Написать сообщение..."
					value={this.state.comment}
				/>

				<button
					className={`${style.nav_button_blue} flex_basis_auto`}
					onClick={this.saveComment}
					>Отправить</button>
				</div>

			</div> : <div>
			<button
				className={`${style.nav_button_blue}`}
				onClick={() => openConnection()}
				>Войти</button>
		</div>

		return (
			<div className={`h_w_100 ${style.col_container} justify_center`}>
				{main_div}
			</div>
		)
	}
}
Messages.propTypes = {
  messages: PropTypes.object.isRequired,
}
function mapStateToProps (state) {
	return {
		messages: state.messages,
	}
}
function mapDispatchToProps(dispatch) {
  return {
    websocket: bindActionCreators(websocket, dispatch),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Messages)
