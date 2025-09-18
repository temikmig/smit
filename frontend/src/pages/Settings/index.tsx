import type { ReactNode } from "react";
import Button from "../../components/ui/Button";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import Input from "../../components/ui/Input";
import { Checkbox } from "../../components/ui/Checkbox";
import { Radio } from "../../components/ui/Radio";
import { HomeIcon } from "../../assets/icons";
import { Select } from "../../components/ui/Select";
import { MultiSelect } from "../../components/ui/MultiSelect";
// import Select from "../../components/ui/Select";
// import MultiSelect from "../../components/ui/MultiSelect";
// import { HomeIcon } from "../../assets/icons";

const UiBlock = ({
  title,
  children,
  column = false,
}: {
  title: string;
  children: ReactNode;
  column?: boolean;
}) => {
  return (
    <div>
      <h5 style={{ marginBottom: 8 }}>{title}</h5>
      <div
        style={{
          display: "flex",
          gap: 8,
          flexDirection: column ? "column" : "row",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const Settings = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <UiBlock title="Кнопки Big">
        <Button size="big">Кнопка Primary</Button>
        <Button size="big" icon={<SearchIcon />}>
          Кнопка Primary с иконкой
        </Button>
        <Button size="big" variant="secondary">
          Кнопка Secondary
        </Button>
        <Button size="big" variant="outline">
          Кнопка Outline
        </Button>
      </UiBlock>
      <UiBlock title="Кнопки Medium (стандартно)">
        <Button>Кнопка Primary</Button>
        <Button icon={<SearchIcon />}>Кнопка Primary с иконкой</Button>
        <Button variant="secondary">Кнопка Secondary</Button>
        <Button variant="outline">Кнопка Outline</Button>
      </UiBlock>
      <UiBlock title="Кнопки Medium (стандартно) disabled">
        <Button disabled>Кнопка Primary</Button>
        <Button disabled icon={<SearchIcon />}>
          Кнопка Primary с иконкой
        </Button>
        <Button disabled variant="secondary">
          Кнопка Secondary
        </Button>
        <Button disabled variant="outline">
          Кнопка Outline
        </Button>
      </UiBlock>
      <UiBlock title="Кнопки Small">
        <Button size="small">Кнопка Primary</Button>
        <Button size="small" icon={<SearchIcon />}>
          Кнопка Primary с иконкой
        </Button>
        <Button size="small" variant="secondary">
          Кнопка Secondary
        </Button>
        <Button size="small" variant="outline">
          Кнопка Outline
        </Button>
      </UiBlock>
      <UiBlock title="Поля ввода">
        <Input label="Обычное поле ввода" placeholder="Поле ввода" />
        <Input label="Пароль" type="password" placeholder="Пароль" />
        <Input label="Disabled поле ввода" placeholder="Поле ввода" disabled />
        <Input
          label="Поле с текстом ошибки"
          placeholder="Поле ввода"
          error
          errorMessage="Текст ошибки"
        />
        <Input
          label="Поле с подсказкой"
          placeholder="Поле ввода"
          helperText="Подсказка"
        />
        <Input
          label="Поле ввода с иконкой слева"
          leftIcon={<HomeIcon />}
          placeholder="Поле ввода"
        />
      </UiBlock>
      <UiBlock title="Чекбоксы" column>
        <Checkbox label="Пункт 1" />
        <Checkbox label="Пункт 2" />
        <Checkbox label="Пункт disabled" disabled />
        <Checkbox label="Пункт с ошибкой" error errorMessage="Текст ошибки" />
      </UiBlock>
      <UiBlock title="Радиобоксы" column>
        <Radio name="gender" label="Пункт 1" />
        <Radio name="gender" label="Пункт 2" />
        <Radio name="gender" label="Пункт disabled" disabled />
        <Radio
          name="gender"
          label="Ошибка"
          error
          errorMessage="Выберите вариант"
        />
      </UiBlock>
      <UiBlock title="Одиночный селект">
        <Select
          label="Выбор"
          options={[
            { label: "Выберите вариант", value: "" },
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
            { label: "Option 4", value: "4" },
            { label: "Option 5", value: "5" },
            { label: "Option 6", value: "6" },
            { label: "Option 7", value: "7" },
            { label: "Option 8", value: "8" },
            { label: "Option 9", value: "9" },
          ]}
          onChange={() => {}}
          helperText="Выберите один из вариантов"
        />
        <Select
          label="Ошибка"
          options={[
            { label: "Выберите вариант", value: "" },
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          error
          errorMessage="Выберите значение"
          onChange={() => {}}
        />
        <Select
          label="Disabled"
          options={[
            { label: "Выберите вариант", value: "" },
            { label: "Option 1", value: "1" },
            { label: "Option 2", value: "2" },
            { label: "Option 3", value: "3" },
          ]}
          onChange={() => {}}
          disabled
        />
      </UiBlock>

      <UiBlock title="Мульти селект">
        <MultiSelect
          label="Выберите несколько"
          options={[
            { label: "Email", value: "email", icon: <HomeIcon /> },
            { label: "User", value: "user", icon: <HomeIcon /> },
            { label: "Option 3", value: "3" },
          ]}
          helperText="Можно выбрать несколько опций"
          onChange={(vals) => console.log("Selected:", vals)}
        />

        <MultiSelect
          label="Ошибка"
          options={[
            { label: "Email", value: "email", icon: <HomeIcon /> },
            { label: "User", value: "user", icon: <HomeIcon /> },
            { label: "Option 3", value: "3" },
          ]}
          error
          errorMessage="Выберите хотя бы один вариант"
        />

        <MultiSelect
          label="Disabled"
          options={[
            { label: "Email", value: "email", icon: <HomeIcon /> },
            { label: "User", value: "user", icon: <HomeIcon /> },
            { label: "Option 3", value: "3" },
          ]}
          disabled
        />
      </UiBlock>
    </div>
  );
};
