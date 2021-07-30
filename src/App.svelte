<script lang="ts">
	import { Router, Route, Link } from "svelte-navigator";
	import PrivateRoute from "./components/PrivateRoute.svelte";
	import Login from "./pages/Login.svelte";
	import Profile from "./pages/Profile.svelte";
</script>

<Router>
	<Link to="/profile">profile</Link>
	<Link to="/">Index</Link>
	<Route path="/">
		<Login />
	</Route>

	<PrivateRoute path="/profile">
		<Profile />
	</PrivateRoute>
</Router>
