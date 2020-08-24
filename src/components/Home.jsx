import React from 'react'
import Card from './Card'
import Data from './Data.json'

class Home extends React.Component {

    state = {
        products: Data,
        isTarget: '',
        length: 0
    }

    handleData = () => {
        let products;
        if(this.state.products.length > 0) {
            products = this.state.products.map(product =>
            <Card 
                isTarget={this.state.isTarget}
                onDelete={this.onDelete}
                onMinus={this.onMinus}
                onAdd={this.onAdd}
                product={product}
                key={product.id}
            />
        )} else {
            products = <h2 className='no-products'>There is no product to show</h2>
        }
        return products
    }

    onAdd = (isAbleToChange) => {
        isAbleToChange&&this.setState({
            length: this.state.length + 1
        })
    }

    onMinus = (isAbleToChange) => {
        isAbleToChange&&this.setState({
            length: this.state.length - 1
        })
    }

    onDelete = (productId, isAbleToChange) => {
        this.onMinus(isAbleToChange)
        this.setState({
            products: this.state.products
            .filter(product=>product.id!==productId)
        })
    }
    
    handleReset = (event) => {
        this.setState({
            products: Data,
            isTarget: event.target.textContent,
            length: 0
        })

        setTimeout(() => {
            this.setState({isTarget: ''})
        }, 0)
    }

    render() {
        
        return (
            <React.Fragment>
                <div className='products-length'>
                    product Selected: {this.state.length}
                    <button 
                        disabled={this.state.length>0||this.state.products.length<Data.length?false:true}
                        className='reset-btn'
                        onClick={this.handleReset}
                    >Reset</button>
                </div>
                {this.handleData()}
            </React.Fragment>
        )
    }
}

export default Home