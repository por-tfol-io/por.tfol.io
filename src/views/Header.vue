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
    text-transform: uppercase;
    font-size: 1.04rem;

    > h1,
    > nav {
      margin: 0;
    }

    a:not(.router-link-active) {
      opacity: var(--opacity-reduced);
    }

    .title,
    .subtitle {
      margin-top: -.35em;
      font-size: 2.6em;

      .small {
        display: inline-block;
        white-space: nowrap;
        word-break: keep-all;
        margin-bottom: 1.5rem;
        line-height: 0;
        font-weight: bold;
      }
    }

    .title {
      flex-grow: .2;
      /*font-size: 4.7em;*/

      .small {
        font-size: .45em;
      }
    }

    .subtitle {
      flex-grow: 1;

      .small {
        font-size: .3em;
      }
    }

    nav {
      flex-grow: 0;
      font-size: .8rem;

      a {
        border-bottom: 2px solid;

        &:not(:last-child) {
          margin-right: .5em;
        }
      }
    }
  }

</style>
