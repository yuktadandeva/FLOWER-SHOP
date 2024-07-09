const cartOperations = {

    flowers: [],
    addToCart(flowerId){

        const flower = this.flowers.find(phool => phool.productId == flowerId);
        flower.isInCart = 'true';

        console.log(this.flowers);

    },

    removeFromCart(){

    },

    viewAll(){
      return this.flowers.filter(phool => phool.isInCart);
    },

    total(){

    }
}

export default cartOperations;
