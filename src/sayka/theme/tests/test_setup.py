# -*- coding: utf-8 -*-
"""Setup tests for this package."""
from plone import api
from sayka.theme.testing import SAYKA_THEME_INTEGRATION_TESTING  # noqa

import unittest


class TestSetup(unittest.TestCase):
    """Test that sayka.theme is properly installed."""

    layer = SAYKA_THEME_INTEGRATION_TESTING

    def setUp(self):
        """Custom shared utility setup for tests."""
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')

    def test_product_installed(self):
        """Test if sayka.theme is installed."""
        self.assertTrue(self.installer.isProductInstalled(
            'sayka.theme'))

    def test_browserlayer(self):
        """Test that ISaykaThemeLayer is registered."""
        from sayka.theme.interfaces import (
            ISaykaThemeLayer)
        from plone.browserlayer import utils
        self.assertIn(ISaykaThemeLayer, utils.registered_layers())


class TestUninstall(unittest.TestCase):

    layer = SAYKA_THEME_INTEGRATION_TESTING

    def setUp(self):
        self.portal = self.layer['portal']
        self.installer = api.portal.get_tool('portal_quickinstaller')
        self.installer.uninstallProducts(['sayka.theme'])

    def test_product_uninstalled(self):
        """Test if sayka.theme is cleanly uninstalled."""
        self.assertFalse(self.installer.isProductInstalled(
            'sayka.theme'))

    def test_browserlayer_removed(self):
        """Test that ISaykaThemeLayer is removed."""
        from sayka.theme.interfaces import \
            ISaykaThemeLayer
        from plone.browserlayer import utils
        self.assertNotIn(ISaykaThemeLayer, utils.registered_layers())
