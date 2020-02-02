import { h, render, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';

import { md2html } from '../lib/markdown.worker';

const App = (): h.JSX.Element => {
  const [inputValue, setInputValue] = useState('');
  const [converted, setConverted] = useState('');

  const updateInputValue: h.JSX.GenericEventHandler<HTMLTextAreaElement> = useCallback(
    e => {
      setInputValue(e.currentTarget.value);
      md2html(e.currentTarget.value).then(current => setConverted(current));
    },
    [inputValue]
  );

  return (
    <Fragment>
      <div class="c-col-2">
        <div class="c-col-2__col">
          <h2 class="c-heading -lv2">Input</h2>

          <textarea
            name="input"
            cols={30}
            rows={10}
            class="p-input-area"
            value={inputValue}
            onInput={updateInputValue}
          ></textarea>
        </div>

        <div class="c-col-2__col">
          <div class="p-col-push">
            <div class="p-col-push__el">
              <h2 class="c-heading -lv2">Output</h2>
            </div>

            <div class="p-col-push__el -push">
              <div class="p-output-area u-full-height">
                <div
                  class="content"
                  dangerouslySetInnerHTML={{ __html: converted }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <a href="/te.html">te.html (by sw)</a>
      </div>
    </Fragment>
  );
};

render(<App />, document.body);

window.addEventListener('load', async () => {
  try {
    await navigator.serviceWorker.register('/sw.js');
  } catch (e) {
    console.log('register failed', e);
  }
});
