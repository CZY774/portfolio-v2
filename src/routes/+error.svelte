<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="error-container">
	<div class="error-content">
		<h1 class="error-code">{$page.status}</h1>
		<h2 class="error-title">
			{#if $page.status === 404}
				Halaman Tidak Ditemukan
			{:else if $page.status >= 500}
				Terjadi Kesalahan Server
			{:else}
				Oops! Ada Kesalahan
			{/if}
		</h2>
		<p class="error-message">
			{$page.error?.message || 'Mohon maaf, terjadi kesalahan yang tidak terduga.'}
		</p>
		<a href="/" class="back-home">Kembali ke Beranda</a>
	</div>
</div>

<style>
	.error-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 2rem;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
	}

	.error-content {
		text-align: center;
		color: white;
		max-width: 600px;
	}

	.error-code {
		font-size: 8rem;
		font-weight: 900;
		margin: 0;
		line-height: 1;
		text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.3);
	}

	.error-title {
		font-size: 2rem;
		margin: 1rem 0;
		font-weight: 600;
	}

	.error-message {
		font-size: 1.1rem;
		margin: 1.5rem 0 2rem;
		opacity: 0.9;
	}

	.back-home {
		display: inline-block;
		padding: 0.75rem 2rem;
		background: white;
		color: #667eea;
		text-decoration: none;
		border-radius: 50px;
		font-weight: 600;
		transition:
			transform 0.2s,
			box-shadow 0.2s;
	}

	.back-home:hover {
		transform: translateY(-2px);
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
	}

	@media (max-width: 640px) {
		.error-code {
			font-size: 5rem;
		}

		.error-title {
			font-size: 1.5rem;
		}

		.error-message {
			font-size: 1rem;
		}
	}
</style>
