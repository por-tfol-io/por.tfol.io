<template>
  <div class="header">
    <nav>
      <router-link to="/about">about</router-link>
      <router-link to="/gallery">gallery</router-link>
      <router-link to="/contact">contact</router-link>
    </nav>
    <h1 class="title">
      <router-link to="/">
        <span class="small">{{ i18n.title[0] }}</span>
        <br/>{{ i18n.title[1] }}
      </router-link>
    </h1>
    <h1 class="subtitle">
      <span class="small">{{ i18n.subtitle[0] }}</span>
      <br/>{{ i18n.subtitle[1] }}
    </h1>
  </div>
</template>

<script>

export default {
  name: 'Header',
  data() {
    return {
      i18n: {
        title: ['hi, my name is', 'eliran'],
        // subtitle: ['this is my programming', 'portfolio'],
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
    align-items: end;
    justify-content: stretch;
    text-align: center;
    text-transform: uppercase;
    font-size: 1.04rem;

    > * {
      margin: 0;
    }

    nav {
      align-self: flex-start;
      flex-grow: 1;
      font-size: .7rem;

      a {
        border-bottom: 2px solid;
        text-decoration: none;
        font-weight: bold;

        &:not(:last-child) {
          margin-right: .5em;
        }
      }
    }


    .small {
      display: inline-block;
      white-space: nowrap;
      word-break: keep-all;
    }

    .title {
      font-size: 4.7em;

      .small {
        font-size: .465em;
      }
    }

    .subtitle {
      margin-top: -.35em;
      font-size: 2.6em;

      .small {
        margin-bottom: .8em;
        font-size: .32em;
      }
    }

    .title {
      a {
        text-decoration: none;
      }
    }

    a:not(.router-link-exact-active) {
      opacity: .5;
    }
  }

</style>
