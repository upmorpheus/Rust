import { Tooltip } from '@material-ui/core';
import React, { memo, useEffect } from 'react';
import { Link, scrollSpy } from 'react-scroll';

const SectionIcon = ({ section, containerId, tooltipPlacement }) => {
  const { id, name, icon: Icon } = section;

  useEffect(() => {
    scrollSpy.update();
  }, []);

  return (
    <Tooltip title={name} placement={tooltipPlacement} arrow>
      <Link
        spy
        smooth
        to={id}
        offset={-18}
        duration={500}
        containerId={containerId}
        activeClass="text-primary-900"
        className="py-2 cursor-pointer focus:outline-none focus:text-primary-900 hover:text-primary-900"
      >
        <Icon size="18px" />
      </Link>
    </Tooltip>
  );
};

export default memo(SectionIcon);
