import { createRouter, createWebHistory } from 'vue-router';
import TeamMembers from './components/teams/TeamMembers.vue';

import TeamsList from './views/TeamsList.vue';
import UsersList from './views/UsersList.vue';
import TeamsFooter from './views/TeamsFooter.vue';
import UsersFooter from './views/UsersFooter.vue';

import NotFound from './views/NotFound.vue';

const router = createRouter ({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/teams' },
    { path: '/teams', components: { default: TeamsList, footer: TeamsFooter },
      // teams children
      children: [
        // props: true, pass datoum -> teamId to TeamMembers, 
        // meta: -> in TeamsMembers ::: $route.meta to get meta
        { name: 'team-members', 
          path: ':teamId', component: TeamMembers,
          props: true,
          meta: { needsAuth: true }, 
        },
      ], 
    },
    { path: '/users', components: { default: UsersList, footer: UsersFooter } },
    
    { path: '/:notFound(.*)', component: NotFound },
  ],
  // every time to load a page for first time go to 0,0
  // if you come from back load it for second time and it holds your previous focus in page
  scrollBehavior(to, from, savedPosition) {
    if( savedPosition ) {
      return savedPosition;
    }
    return { left: 0, top: 0 };
    
  },
  linkActiveClass: 'router-link-active'
});

// is good for check authentication access here
router.beforeEach( function(to, from, next) {
  console.log("Global beforeEach");
  console.log(to, from);
  if ( to.meta.needsAuth ) {
    console.log("It needs Auth!");

    // console.log(to.query);
    // if ( from.query.auth === "false" ) next(false);
    // else next();

    next();
  } else {
    next();
  }
  // if( to.path === '/teams' && from.path === '/' ) {
  //   console.log("Eimai sto /teams");
  //   return next( {path: '/teams/t1' } );
  // } else if( to.path === '/users' ) {
  //   return next( { path: '/teams/t2' });
  // } else if ( to.path === '/teams') {
  //   return next( {path: '/teams/t3'} );
  // } else next();
});

export default router;