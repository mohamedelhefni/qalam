<template>
    <div class="items">
        <template v-if="items.length">
            <button class="item" :class="{ 'is-selected': index === selectedIndex }" v-for="(item, index) in items"
                :key="index" @click="selectItem(index)">
                {{ item.unicode }} {{ Array.isArray(item.alias) ? item.alias.join(", ") :  item.alias }}
            </button>
        </template>
        <div class="item" v-else>
            لا يوجد نتايج
        </div>
    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true,
        },

        command: {
            type: Function,
            required: true,
        },

    },

    data() {
        return {
            selectedIndex: 0,
        }
    },

    watch: {
        items() {
            this.selectedIndex = 0
        },
    },

    methods: {
        onKeyDown({ event }) {


            if (event.key === 'ArrowUp') {
                this.upHandler()
                return true
            }

            if (event.key === 'ArrowDown') {
                this.downHandler()
                return true
            }

            if (event.key === 'Enter') {
                this.enterHandler()
                return true
            }

            return false
        },

        upHandler() {
            this.selectedIndex = ((this.selectedIndex + this.items.length) - 1) % this.items.length
        },

        downHandler() {
            this.selectedIndex = (this.selectedIndex + 1) % this.items.length
        },

        enterHandler() {
            this.selectItem(this.selectedIndex)
        },

        selectItem(index) {
            const item = this.items[index]

            if (item) {
                this.command({ id: item.unicode })
            }
        },
    },
}
</script>

<style lang="scss">
.items {
    padding: 0.2rem;
    position: relative;
    border-radius: 12px;
    background: var(--surface-raised);
    color: hsl(var(--bc));
    border: 1px solid hsl(var(--b3));
    overflow: hidden;
    font-size: 0.9rem;
    box-shadow: var(--shadow-md);
}

.item {
    display: block;
    margin: 0;
    width: 100%;
    text-align: start;
    background: transparent;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.2rem 0.4rem;

    &.is-selected {
        background: hsl(var(--s));
        color: hsl(var(--sc));
    }
}
</style>
