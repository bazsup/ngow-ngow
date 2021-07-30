<script>
  import { useNavigate } from "svelte-navigator";
  import { credential as user } from "../stores";

  const navigate = useNavigate();

  $: if (!$user) {
    navigate("/", {
      replace: true,
    });
  }
</script>

{#if $user}
  <slot />
{/if}
