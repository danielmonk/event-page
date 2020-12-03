<?php
$title = (array_key_exists('title', $data)) ? $data['title'] : false;
$description = (array_key_exists('description', $data)) ? $data['description'] : '';
$accordion = (array_key_exists('accordion', $data)) ? $data['accordion'] : array();
$open_first_accordion = (array_key_exists('open_first_accordion', $data)) ? $data['open_first_accordion'] : false;
?>

<?php if(is_array($accordion) && count($accordion)) : ?>
	<div class="section accordion">
		<div class="accordion__inner">
			<header class="section__header">
				<?php echo ($title) ? '<h2 class="section-title">'.$title.'</h2>' : ''; ?>
				<?php echo ($description) ? $description : ''; ?>
			</header>
			
			<div class="accordion__list">
				<?php foreach($accordion as $item) : ?>
					<div class="accordion__item <?php ($open_first_accordion) ? 'active' : ''; ?>">
						<h4 class="accordion__title">
							<?php echo $item['item_title']?>
							<span class="accordion__handle">
								<svg viewBox="0 0 20 10"><path d="M0,0 10,10 20,0" /></svg>
							</span>
						</h4>
						<div class="accordion__content">
							<?php echo $item['item_content']?>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
	</div>
<?php endif; ?>