<template>
    <div>
    <Button @click="modal4 = true">Internationalization</Button>
    <Modal
        v-model="modal4"
        title="Modal Title"
        ok-text="OK"
        cancel-text="Cancel">
        <p>Something...</p>
        <p>Something...</p>
        <p>Something...</p>
    </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                modal_loading: false,
                modal4: false
            }
        },
        methods: {
            del () {
                this.modal_loading = true;
                setTimeout(() => {
                    this.modal_loading = false;
                    console.log('成功');
                    this.$Message.success('Successfully delete');
                }, 2000);
            }
        }
    }
</script>
