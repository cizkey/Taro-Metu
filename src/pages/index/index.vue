<template>
    <view class="text-white" style="background-color: red">
        <Counter />
    </view>
    <view class="w-20px h-20px bg-red"></view>
    <button class="i-carbon-sun dark:i-carbon-moon" />
    <nut-button type="success">成功按钮</nut-button>
</template>

<script lang="ts" setup>
import './index.scss';
import Counter from '../../components/Counter.vue';
</script>
