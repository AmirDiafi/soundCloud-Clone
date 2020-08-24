import React from 'react'
import './stylesheets/Card.css'

class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            value: this.props.product.value,
            isDisable: true,
            isAbleToChange: true
        }
    }

    increase = () => {
        let {isAbleToChange, value} = this.state
        isAbleToChange&&this.props
        .onAdd(isAbleToChange)
        this.setState({
            value: value + 1,
            isDisable: (value>=0)?false:true,
            isAbleToChange: false,
        })
    }

    decrease = () => {
        let isAble = this.state.value>1?false:true;
        (isAble)&&this.props.onMinus(isAble)
        this.setState({
            value: this.state.value - 1,
            isDisable: isAble,
            isAbleToChange: isAble
        })
    }

    handleReset = () => {
        let isAble = this.state.value<=0?false:true;
        (isAble)&&this.props.onMinus(true)
        this.setState({
            value:0,
            isDisable: isAble,
            isAbleToChange: true
        })
    }

    componentDidUpdate() {
        let value = this.state.value
        let isTarget = this.props.isTarget
        isTarget==='Reset'&&value>0&&this.setState({
            value:0,
            isAbleToChange: true,
            isDisable: true
        })
    }

    handleDelete = () => {
        let isDeleted = window.confirm('are you sure')
        isDeleted&&this.props.onDelete(this.props.product.id, this.state.value>1?true:false)
    }

    render() {
        return (
            <div className='card'>
                <div className="about">
                    <div className="image">
                        <img src={'images/products/'+this.props.product.image} alt=""/>
                    </div>
                    <div className="info">
                        <h3>{this.props.product.title}</h3>
                        <p>{this.props.product.desc}</p>
                        <p><span>Sizes: </span> {this.props.product.size}</p>
                    </div>
                </div>
                <div className="counter">
                    <button 
                        onClick={this.decrease}
                        className='count-btn'
                        disabled={this.state.isDisable}
                    >-</button>
                    <span
                        className={this.handleClass()}>
                        {this.handleDisplay()}
                    </span>
                    <button
                        className='count-btn' 
                        onClick={this.increase}
                    >+</button>
                    <button 
                        className="delete"
                        onClick={this.handleDelete}
                    >
                        Delete
                    </button>
                    <button 
                        disabled={this.state.isDisable}
                        className="reset"
                        onClick={this.handleReset}
                    >
                        Reset
                    </button>
                </div>
            </div>
        )
    }

    handleDisplay = () => {
        let {value} = this.state
        return (value===0)?"Zero":value
    }

    handleClass = () => {
        let classes = 'count '
        classes += (this.state.value===0)&&'zero'
        return classes
    }

}

export default Card