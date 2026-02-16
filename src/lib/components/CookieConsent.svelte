<script lang="ts">
	let { cookieConsent = $bindable<boolean | null>(null) } = $props();

	function accept() {
		localStorage.setItem('cookieConsent', 'true');
		cookieConsent = true;
	}

	function decline() {
		localStorage.setItem('cookieConsent', 'false');
		cookieConsent = false;
	}
</script>

{#if cookieConsent === null}
	<div class="cookie-banner">
		<div class="cookie-content">
			<p class="cookie-text">
				we use analytics to improve your experience. by accepting, you consent to vercel analytics.
			</p>
			<div class="cookie-buttons">
				<button onclick={accept} class="cookie-btn accept">accept</button>
				<button onclick={decline} class="cookie-btn decline">decline</button>
			</div>
		</div>
	</div>
{/if}

<style>
	.cookie-banner {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 100;
		background: rgba(255, 255, 255, 0.95);
		backdrop-filter: blur(12px);
		border-top: 1px solid rgba(7, 54, 254, 0.1);
		padding: 1.5rem;
		animation: slideUp 0.4s ease-out;
	}

	:global(.dark) .cookie-banner {
		background: rgba(0, 0, 0, 0.95);
		border-top: 1px solid rgba(7, 54, 254, 0.3);
	}

	.cookie-content {
		max-width: 1200px;
		margin: 0 auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		flex-wrap: wrap;
	}

	.cookie-text {
		font-size: 0.95rem;
		font-weight: 300;
		color: #666;
		margin: 0;
		flex: 1;
		min-width: 250px;
	}

	:global(.dark) .cookie-text {
		color: #999;
	}

	.cookie-buttons {
		display: flex;
		gap: 1rem;
	}

	.cookie-btn {
		padding: 0.75rem 2rem;
		font-size: 0.95rem;
		font-weight: 300;
		border: 1px solid currentColor;
		background: transparent;
		transition: all 0.3s ease;
		position: relative;
		overflow: hidden;
	}

	.cookie-btn::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 0;
		height: 100%;
		transition: width 0.3s ease;
		z-index: -1;
	}

	.cookie-btn.accept {
		color: #0736fe;
		border-color: #0736fe;
	}

	.cookie-btn.accept::before {
		background: #0736fe;
	}

	.cookie-btn.accept:hover::before {
		width: 100%;
	}

	.cookie-btn.accept:hover {
		color: white;
	}

	.cookie-btn.decline {
		color: #666;
		border-color: #666;
	}

	:global(.dark) .cookie-btn.decline {
		color: #999;
		border-color: #999;
	}

	.cookie-btn.decline::before {
		background: #666;
	}

	.cookie-btn.decline:hover::before {
		width: 100%;
	}

	.cookie-btn.decline:hover {
		color: white;
	}

	@keyframes slideUp {
		from {
			transform: translateY(100%);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	@media (max-width: 640px) {
		.cookie-content {
			flex-direction: column;
			text-align: center;
		}

		.cookie-buttons {
			width: 100%;
			flex-direction: column;
		}

		.cookie-btn {
			width: 100%;
		}
	}
</style>
