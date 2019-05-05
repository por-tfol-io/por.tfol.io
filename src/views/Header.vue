<template>
  <div class="header">
    <h1 class="title">
      <span class="small">{{ i18n.title[0] }}</span>
      <br/>{{ i18n.title[1] }}
    </h1>
    <h1 class="subtitle">
      <router-link to="/">
        <span class="small">{{ i18n.subtitle[0] }}</span>
        <br/>{{ i18n.subtitle[1] }}
      </router-link>
    </h1>
    <nav>
      <router-link to="/about">about</router-link>
      <router-link to="/gallery">gallery</router-link>
      <router-link to="/contact">contact</router-link>
    </nav>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      i18n: {
        title: ['hi, my name is', 'eliran'],
        subtitle: ['this is my software development', 'portfolio'],
      },
    };
  },
};
</script>

<style scoped lang="scss">

  .header {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: stretch;
    text-align: center;
    font-size: 1.04rem;

    > h1,
    > nav {
      margin: 0;
      text-transform: uppercase;
    }

    a {
      &.router-link-exact-active {
        cursor: default;
      }

      &:not(.router-link-active) {
        opacity: var(--opacity-reduced);
      }
    }

    .title,
    .subtitle {
      margin-top: -.4em;
      font-size: 2.6em;

      .small {
        display: inline-block;
        margin-bottom: 1.5rem;
        line-height: 0;
        white-space: nowrap;
        word-break: keep-all;
        font-weight: bold;
        text-transform: lowercase;
      }
    }

    .title {
      flex-grow: .2;

      .small {
        font-size: .43em;
      }
    }

    .subtitle {
      flex-grow: 1;

      .small {
        font-size: .333em;
      }
    }

    nav {
      flex-grow: 0;
      font-size: .8rem;

      a {
        border-bottom: 2px solid;
        margin-right: .5em;

        &:last-child {
          margin-right: 0;
        }
      }
    }
  }

</style>
