# Mount vs Shallow

They render html differntly

```bash
$ jest
 FAIL  src/components/Wrapper/Wrapper.spec.tsx
  <Wrapper />
    ✕ renders with correct className with mount (51 ms)
    ✓ renders with correct className with shallow (3 ms)

  ● <Wrapper /> › renders with correct className with mount

    expect(received).toBeTruthy()

    Received: false

       7 |     const wrapper = mount(<Wrapper>Children here</Wrapper>);
       8 |     console.log(wrapper.debug());
    >  9 |     expect(wrapper.hasClass('wrapper')).toBeTruthy();
         |                                         ^
      10 |   });
      11 |   test('renders with correct className with shallow', () => {
      12 |     const wrapper = shallow(<Wrapper>Children here</Wrapper>);

      at Object.<anonymous> (src/components/Wrapper/Wrapper.spec.tsx:9:41)

  console.log
    <Wrapper>
      <div className="wrapper">
        Children here
      </div>
    </Wrapper>

      at Object.<anonymous> (src/components/Wrapper/Wrapper.spec.tsx:8:13)

  console.log
    <div className="wrapper">
      Children here
    </div>
```
