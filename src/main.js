import Vue from 'vue';

import * as Components from 'App/components';
import * as Blocks from 'App/blocks';
import * as Directives from 'App/directives';
import * as Pages from 'App/pages';

const AllComponents = { ...Components, ...Pages, ...Blocks };

app = new Vue({
  el: `#app`,

  components: AllComponents,

  directives: Directives,
});

export default app;
