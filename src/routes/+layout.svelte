<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<nav class="flex items-center justify-center text-3xl font-bold border-b p-5">
	<img class="w-52" src="/logo.png" alt="">
</nav>
{@render children()}
