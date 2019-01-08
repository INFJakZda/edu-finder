<template lang="html">
  <sui-item-group>
   
    <sui-item class="dev-border">
      <sui-item-image src="static/images/wireframes/image.png" />
      <sui-item-content>
        <sui-item-header>Header</sui-item-header>
        <sui-item-meta>
          <span>Description</span>
        </sui-item-meta>
        <sui-item-description>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </sui-item-description>
        <sui-item-extra>
          Additional Details
        </sui-item-extra>
      </sui-item-content>
    </sui-item>
    
    <sui-item>
      <sui-item-image src="static/images/wireframes/image.png" />
      <sui-item-content>
        <sui-item-header>Header</sui-item-header>
        <sui-item-meta>
          <span>Description</span>
        </sui-item-meta>
        <sui-item-description>
          <p>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
          </p>
        </sui-item-description>
        <sui-item-extra>
          Additional Details
        </sui-item-extra>
      </sui-item-content>
    </sui-item>
  </sui-item-group>
</template>

<script>
export default {
  name: 'ItemGroupExample'
}
</script>

<style>
.dev-border {
  box-shadow: 0px 2px 4px 0px rgba(34, 36, 38, 0.12),
    0px 2px 10px 0px rgba(34, 36, 38, 0.15);
}
</style>
