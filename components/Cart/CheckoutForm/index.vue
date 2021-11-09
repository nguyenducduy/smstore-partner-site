<template>
  <div class="flex">
    <ValidationObserver v-slot="{ handleSubmit }" class="w-full">
      <form @submit.prevent="handleSubmit(onOrder)" class="flex flex-col-reverse md:flex-row">
        <div class="w-full pt-6 mx-auto md:p-4 md:w-1/2">
          <div>
            <div class="p-2 card-body">
              <div :class="`mb-2 text-sm font-light alert alert-${alertType}`" v-if="message !== ''">
                <div class="flex-1">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 mx-2 stroke-current"> 
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>                         
                  </svg> 
                  <label>{{ message }}</label>
                </div>
              </div>
              <div class="mb-2 ">
                <label class="block font-light">Tên khách hàng</label>
                <ValidationProvider rules="required" name="Tên khách hàng" v-slot="{ errors }">
                  <input
                    type="text"
                    class="w-full py-2 pl-3 mt-2 input input-bordered"
                    v-model="fullName"
                  />
                  <span class="mt-2 text-sm text-red-400">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-2 ">
                <label class="block font-light">Email</label>
                <ValidationProvider rules="required|email" name="Email" v-slot="{ errors }">
                  <input
                    type="text"
                    class="w-full py-2 pl-3 mt-2 input input-bordered"
                    v-model="email"
                  />
                  <span class="mt-2 text-sm text-red-400">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-2">
                <label class="block font-light">Số điện thoại liên lạc</label>
                <ValidationProvider rules="required" name="Số điện thoại liên lạc" v-slot="{ errors }">
                  <input
                    type="text"
                    class="w-full py-2 pl-3 mt-2 input input-bordered"
                    v-model="phoneNumber"
                  />
                  <span class="mt-2 text-sm text-red-400">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-2">
                <label class="block font-light">Địa chỉ nhận hàng</label>
                <ValidationProvider rules="required" name="Địa chỉ nhận hàng" v-slot="{ errors }">
                  <input
                    type="text"
                    class="w-full py-2 pl-3 mt-2 input input-bordered"
                    v-model="address"
                  />
                  <span class="mt-2 text-sm text-red-400">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
              <div class="mb-2">
                <label class="block font-light">Ghi chú</label>
                <ValidationProvider name="Ghi chú" v-slot="{ errors }">
                  <textarea
                    class="w-full py-2 pl-3 mt-2 textarea textarea-bordered"
                    v-model="note"
                  ></textarea>
                  <span class="mt-2 text-sm text-red-400">{{ errors[0] }}</span>
                </ValidationProvider>
              </div>
            </div>
          </div>
        </div>
        <div class="w-full md:px-2 md:w-1/2">
          <div class="md:p-4">
            <div class="flex justify-between">
              <div class="m-2 font-light text-center text-gray-700 lg:px-4 lg:py-2 ">
                Số tiền phải thanh toán
              </div>
              <div class="m-2 font-bold text-center text-gray-900 lg:px-4 lg:py-2 lg:text-2xl">
                {{ sumPrice | number('0,0') }} &#8363;
              </div>
            </div>
            <button :class="`w-full my-2 button ${loading ? 'loading' : '' }`">
              Đặt hàng
            </button> 
          </div>
        </div>
      </form>
    </ValidationObserver>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { Mutation, Getter } from 'vuex-class'
import { ValidationObserver, ValidationProvider } from "vee-validate"

import createOrder from '@/gql/mutations/createOrder.gql'

@Component({
  components: {
    ValidationObserver,
    ValidationProvider
  }
})
export default class CartCheckoutForm extends Vue {
  @Getter('currentShopId') currentShopId
  @Getter('cart/checkout') cartCheckout
  @Mutation('cart/CHECKOUT_DONE') checkoutDone
  @Mutation('cart/SAVE_CART') saveCart
  
  @Prop()
  sumPrice

  loading: boolean = false
  message: string = ''
  alertType: string  = 'warning'

  fullName: string = ''
  phoneNumber: string = ''
  email: string = ''
  address: string = ''
  note: string = ''
 
  async onOrder() {
    if (this.sumPrice > 0) {
      this.loading = true

      try {
        const r = await this.$apollo.mutate({
          mutation: createOrder,
          variables: {
            cart: JSON.stringify(this.cartCheckout),
            price: this.$helper.cipher(this.sumPrice.toString()),
            customer: JSON.stringify({
              fullName: this.fullName,
              phoneNumber: this.phoneNumber,
              address: this.address,
              email: this.email,
              note: this.note
            })
          }
        })

        this.loading = false

        const msg = `Cảm ơn bạn đã đặt hàng, nhân viên sẽ xác nhận đơn trong thời gian sớm nhất. Mã đơn hàng của bạn là: ${r.data.create_order.code}. Lưu lại mã này để dễ dàng kiểm tra trạng thái đơn hàng.`
        this.$notify({
          type: 'success',
          text: msg,
          duration: -1
        })

        // reload cart
        this.checkoutDone()
        this.saveCart()

        // reset field
        this.fullName = ''
        this.phoneNumber = ''
        this.email = ''
        this.address = ''
        this.note = ''
      } catch (error) {
        this.loading = false;
        this.$notify({ type: 'error', text: 'Không thể đặt hàng tại thời điểm này, vui lòng thử lại sau' })
      }
    } else {      
      this.$notify({ type: 'info', text: 'Vui lòng chọn sản phẩm để đặt hàng' })
    }
  }
}
</script>