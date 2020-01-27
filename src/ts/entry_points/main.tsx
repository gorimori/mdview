import { h, render, Fragment } from 'preact';
import { useState, useCallback } from 'preact/hooks';
// @ts-ignore
import marked from 'marked';

const App = () => {
  const [inputValue, setInputValue] = useState('');
  const updateInputValue: h.JSX.GenericEventHandler<HTMLTextAreaElement> = useCallback(
    e => setInputValue(e.currentTarget.value),
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
                  dangerouslySetInnerHTML={{ __html: marked(inputValue) }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

render(<App />, document.body);
